import React from "react";

type MusicCardProps = {
  title: string;
  author: string;
};

const MusicCard: React.FC<MusicCardProps> = ({ title, author }) => (
  <div className="bg-backdrop w-40 text-backdrop-foreground rounded-lg shadow-lg hover:brightness-125">
    <div className="gap-4 p-4 flex flex-col overflow-ellipsis">
      <div className="bg-white h-32 w-32 rounded-lg" />
      <div className="h-16">
        <h2>{title}</h2>
        <p className="text-sm text-backdrop-foreground brightness-75 overflow-hidden line-clamp-2">
          {author}
        </p>
      </div>
    </div>
  </div>
);

export default function Home() {
  const musics: MusicCardProps[] = [
    { title: "The Empress", author: "Undead Corporation Doujin Works" },
    { title: "Teenagers", author: "My Chemical Romance" },
  ];

  const repeatedArray = Array.from({ length: 3 }, () => musics).flat();
  const repeatedAgain = Array.from({ length: 4 }, () => repeatedArray);

  return (
    <main>
      <div>
        <div>
          {repeatedAgain.map((m, i) => (
            <div key={i} className="flex flex-row p-8 gap-8 overflow-x-scroll">
              {m.map((m, j) => (
                <MusicCard key={j} {...m} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
