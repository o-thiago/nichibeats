import { MusicRecommendation } from "@/server/routers/recommendations";

export const MusicCard: React.FC<MusicRecommendation> = ({ title, author }) => (
  <div className="bg-backdrop w-40 text-backdrop-foreground rounded-lg shadow-lg hover:brightness-125">
    <div className="gap-4 p-4 flex flex-col overflow-ellipsis">
      <div className="bg-white h-32 w-32 rounded-lg" />
      <div className="h-16">
        <h2>{title}</h2>
        <p className="text-sm text-backdrop-foreground dimmed overflow-hidden line-clamp-2">
          {author}
        </p>
      </div>
    </div>
  </div>
);
