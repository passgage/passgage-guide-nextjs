'use client';

import Link from 'next/link';
import { AIAnswerState } from '@/store/aiSearchStore';

interface AIAnswerCardProps {
  answer: AIAnswerState;
  onFollowUpClick?: (chip: string) => void;
}

// Format AI answer text into structured, readable format
function formatAIAnswer(text: string) {
  // Strip HTML tags if present (backend might send HTML)
  let plainText = text.replace(/<[^>]*>/g, '').trim();

  // Parse Markdown bold (**text** → <strong>)
  plainText = plainText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Extract settings paths (e.g., "Ayarlar → Safari" or "Ayarlar>Safari")
  // Match both → (arrow) and > (greater than)
  const settingsPathRegex = /([A-ZİĞÜŞÇÖ][a-zığüşçö]+(?:\s*[→>]\s*[A-ZİĞÜŞÇÖ][a-zığüşçöA-ZİĞÜŞÇÖ\s]+)+)/g;
  const paths: string[] = [];
  const textWithoutPaths = plainText.replace(settingsPathRegex, (match) => {
    // Normalize to use → for display
    const normalizedPath = match.replace(/\s*>\s*/g, ' → ');
    paths.push(normalizedPath);
    return `__PATH_${paths.length - 1}__`;
  });

  // Split into sentences
  const sentences = textWithoutPaths
    .split(/\.\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Count instructions for numbering
  let instructionCounter = 0;

  return (
    <div className="space-y-4">
      {sentences.map((sentence, index) => {
        // Check if sentence contains a path placeholder
        const pathMatch = sentence.match(/__PATH_(\d+)__/);

        if (pathMatch) {
          const pathIndex = parseInt(pathMatch[1]);
          const path = paths[pathIndex];
          const beforePath = sentence.substring(0, sentence.indexOf('__PATH_'));
          const afterPath = sentence.substring(sentence.indexOf('__PATH_') + pathMatch[0].length);

          return (
            <div key={index}>
              {beforePath && (
                <div
                  className="text-neutral-700 mb-3"
                  dangerouslySetInnerHTML={{ __html: beforePath.trim() }}
                />
              )}

              {/* Settings path box */}
              <div className="my-3 p-4 bg-blue-50 border-l-4 border-passgage-blue rounded-r-lg">
                <div className="flex items-center gap-2 text-sm font-mono text-neutral-800 flex-wrap">
                  <span className="text-passgage-blue">⚙️</span>
                  {path.split(' → ').map((step, i, arr) => (
                    <span key={i} className="inline-flex items-center">
                      <span className="font-semibold">{step.trim()}</span>
                      {i < arr.length - 1 && (
                        <svg className="w-4 h-4 mx-1.5 text-passgage-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {afterPath && (
                <div
                  className="text-neutral-700 mt-3"
                  dangerouslySetInnerHTML={{ __html: afterPath.trim() }}
                />
              )}
            </div>
          );
        }

        // Check if sentence is a Markdown heading (contains <strong> at start)
        const isHeading = /^<strong>/.test(sentence);

        if (isHeading) {
          return (
            <div key={index} className="flex items-center gap-2 mt-2 mb-1">
              <span className="text-passgage-red text-lg">📌</span>
              <h4
                className="font-bold text-neutral-900 text-base"
                dangerouslySetInnerHTML={{ __html: sentence }}
              />
            </div>
          );
        }

        // Regular sentence - check if it's an instruction (contains action verbs)
        const isInstruction = /yapın|edin|olun|kontrol|açın|kapatın|verin|vermeniz|basın|tıklayın|gidin|girin|seçin|ayarlayın|değiştirin|kaydırın|gerekmektedir|gerekir|izleyin|emin/i.test(sentence);

        if (isInstruction) {
          instructionCounter++;
        }

        return (
          <div key={index} className={isInstruction ? 'flex gap-3' : ''}>
            {isInstruction && (
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-passgage-red to-passgage-gold text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {instructionCounter}
              </span>
            )}
            <div
              className="text-neutral-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sentence.trim() + '.' }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AIAnswerCard({ answer, onFollowUpClick }: AIAnswerCardProps) {
  return (
    <div className="bg-white rounded-2xl border-2 border-neutral-200 overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-passgage-red/5 to-passgage-gold/5 border-b border-neutral-200">
        <div className="flex items-start gap-4">
          {/* Larger Avatar with pulse animation */}
          <div className="relative">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            >
              🤖
            </div>
            <div
              className="absolute -inset-1 rounded-xl opacity-30 animate-pulse"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-neutral-900 text-lg">🤖 Passgage Asistan</h3>
          </div>
        </div>
      </div>

      {/* AI Answer Content */}
      <div className="px-6 py-5">
        {formatAIAnswer(answer.text)}
      </div>

      {/* Follow-up Chips - More prominent */}
      {answer.followUpChips && answer.followUpChips.length > 0 && (
        <div className="px-6 py-5 bg-gradient-to-r from-neutral-50 to-gray-50 border-t border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-passgage-red to-passgage-gold flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-bold text-neutral-900">
              Devam Soruları
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {answer.followUpChips.map((chip, index) => (
              <button
                key={index}
                onClick={() => onFollowUpClick?.(chip)}
                className="px-5 py-2.5 rounded-full bg-white border-2 border-neutral-200 hover:border-passgage-blue hover:bg-passgage-blue/5 hover:scale-105 text-sm text-neutral-700 hover:text-passgage-blue font-medium transition-all shadow-sm"
              >
                💬 {chip}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
