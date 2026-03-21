export type Platform = "HOTSTAR" | "NETFLIX" | "PRIME";
export type Status = "WATCHED" | "TO_WATCH" | "UNWATCHED";

export interface Movie {
  id: string;
  title: string;
  phase: string;
  year: string;
  requires?: string;
  streamingOn?: Platform;
  status?: Status;
  poster?: string;
}

export const initialMovies: Movie[] = [
  { id: "im1", title: "Iron Man", phase: "Phase 1", year: "2008", streamingOn: "HOTSTAR" },
  { id: "hulk", title: "The Incredible Hulk", phase: "Phase 1", year: "2008", requires: "Iron Man", streamingOn: "PRIME" },
  { id: "im2", title: "Iron Man 2", phase: "Phase 1", year: "2010", requires: "Iron Man", streamingOn: "HOTSTAR" },
  { id: "thor", title: "Thor", phase: "Phase 1", year: "2011", requires: "Iron Man 2", streamingOn: "HOTSTAR" },
  { id: "cap1", title: "Captain America: The First Avenger", phase: "Phase 1", year: "2011", streamingOn: "HOTSTAR" },
  { id: "avengers1", title: "The Avengers", phase: "Phase 1", year: "2012", requires: "Thor, Captain America", streamingOn: "HOTSTAR" },
  { id: "im3", title: "Iron Man 3", phase: "Phase 2", year: "2013", requires: "The Avengers", streamingOn: "HOTSTAR" },
  { id: "thor2", title: "Thor: The Dark World", phase: "Phase 2", year: "2013", requires: "The Avengers", streamingOn: "HOTSTAR" },
  { id: "cap2", title: "Captain America: The Winter Soldier", phase: "Phase 2", year: "2014", requires: "The Avengers", streamingOn: "HOTSTAR" },
  { id: "gotg1", title: "Guardians of the Galaxy", phase: "Phase 2", year: "2014", streamingOn: "HOTSTAR" },
  { id: "avengers2", title: "Avengers: Age of Ultron", phase: "Phase 2", year: "2015", requires: "The Winter Soldier", streamingOn: "HOTSTAR" },
  { id: "antman", title: "Ant-Man", phase: "Phase 2", year: "2015", requires: "Age of Ultron", streamingOn: "HOTSTAR" },
  { id: "cap3", title: "Captain America: Civil War", phase: "Phase 3", year: "2016", requires: "Age of Ultron, Ant-Man", streamingOn: "HOTSTAR" },
  { id: "drstrange", title: "Doctor Strange", phase: "Phase 3", year: "2016", streamingOn: "HOTSTAR" },
  { id: "gotg2", title: "Guardians of the Galaxy Vol. 2", phase: "Phase 3", year: "2017", requires: "Guardians of the Galaxy", streamingOn: "HOTSTAR" },
  { id: "spidey1", title: "Spider-Man: Homecoming", phase: "Phase 3", year: "2017", requires: "Civil War", streamingOn: "NETFLIX" },
  { id: "thor3", title: "Thor: Ragnarok", phase: "Phase 3", year: "2017", requires: "Thor: The Dark World", streamingOn: "HOTSTAR" },
  { id: "bp", title: "Black Panther", phase: "Phase 3", year: "2018", requires: "Civil War", streamingOn: "HOTSTAR" },
  { id: "avengers3", title: "Avengers: Infinity War", phase: "Phase 3", year: "2018", requires: "Ragnarok, Black Panther", streamingOn: "HOTSTAR" },
  { id: "antman2", title: "Ant-Man and the Wasp", phase: "Phase 3", year: "2018", requires: "Civil War", streamingOn: "HOTSTAR" },
  { id: "cm", title: "Captain Marvel", phase: "Phase 3", year: "2019", streamingOn: "HOTSTAR" },
  { id: "avengers4", title: "Avengers: Endgame", phase: "Phase 3", year: "2019", requires: "Infinity War, Captain Marvel", streamingOn: "HOTSTAR" },
  { id: "spidey2", title: "Spider-Man: Far From Home", phase: "Phase 3", year: "2019", requires: "Endgame", streamingOn: "PRIME" },
  { id: "bw", title: "Black Widow", phase: "Phase 4", year: "2021", requires: "Civil War", streamingOn: "HOTSTAR" },
  { id: "shangchi", title: "Shang-Chi", phase: "Phase 4", year: "2021", streamingOn: "HOTSTAR" },
  { id: "eternals", title: "Eternals", phase: "Phase 4", year: "2021", streamingOn: "HOTSTAR" },
  { id: "spidey3", title: "Spider-Man: No Way Home", phase: "Phase 4", year: "2021", requires: "Far From Home", streamingOn: "NETFLIX" },
  { id: "drstrange2", title: "Doctor Strange in the Multiverse of Madness", phase: "Phase 4", year: "2022", requires: "No Way Home", streamingOn: "HOTSTAR" },
  { id: "thor4", title: "Thor: Love and Thunder", phase: "Phase 4", year: "2022", requires: "Endgame", streamingOn: "HOTSTAR" },
  { id: "bp2", title: "Black Panther: Wakanda Forever", phase: "Phase 4", year: "2022", requires: "Endgame", streamingOn: "HOTSTAR" },
  { id: "antman3", title: "Ant-Man and the Wasp: Quantumania", phase: "Phase 5", year: "2023", requires: "Endgame", streamingOn: "HOTSTAR" },
  { id: "gotg3", title: "Guardians of the Galaxy Vol. 3", phase: "Phase 5", year: "2023", requires: "Endgame", streamingOn: "HOTSTAR" },
  { id: "marvels", title: "The Marvels", phase: "Phase 5", year: "2023", requires: "Captain Marvel", streamingOn: "HOTSTAR" },
  { id: "deadpool", title: "Deadpool & Wolverine", phase: "Phase 5", year: "2024", streamingOn: "HOTSTAR" },
  { id: "f4", title: "The Fantastic Four: First Steps", phase: "Phase 6", year: "2025", streamingOn: "HOTSTAR" },
  { id: "thunderbolts", title: "Thunderbolts*", phase: "Phase 6", year: "2025", streamingOn: "HOTSTAR" },
  { id: "avengers5", title: "Avengers: Doomsday", phase: "Phase 6", year: "2026", streamingOn: "HOTSTAR" },
  { id: "spidey4", title: "Spider-Man: Brand New Day", phase: "Phase 6", year: "2026", streamingOn: "HOTSTAR" },
  { id: "avengers6", title: "Avengers: Secret Wars", phase: "Phase 6", year: "2027", streamingOn: "HOTSTAR" }
];
