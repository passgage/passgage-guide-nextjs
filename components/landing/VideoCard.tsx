export interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
  onClick: () => void;
}

export default function VideoCard({ videoId, title, description, onClick }: VideoCardProps) {
  return (
    <div className="group bg-neutral-50 rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-hover transition-all duration-300 cursor-pointer">
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden" onClick={onClick}>
        {/* YouTube Thumbnail */}
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-strong"
            style={{
              background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
            }}
          >
            <svg
              className="w-7 h-7 md:w-9 md:h-9 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge (optional - could be added later) */}
      </div>

      {/* Card Content */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2 group-hover:text-passgage-red transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
