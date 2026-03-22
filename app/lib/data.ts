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
  runtime: number; // in minutes
  postCredits: number; // 0, 1, or 2
  cast: string[]; // Hero IDs like 'stark', 'rogers', etc.
}

export const initialMovies: Movie[] = [
  { id: "im1", title: "Iron Man", phase: "Phase 1", year: "2008", streamingOn: "HOTSTAR", runtime: 126, postCredits: 1, cast: ['stark', 'fury'] },
  { id: "hulk", title: "The Incredible Hulk", phase: "Phase 1", year: "2008", requires: "Iron Man", streamingOn: "PRIME", runtime: 112, postCredits: 1, cast: ['banner', 'stark'] },
  { id: "im2", title: "Iron Man 2", phase: "Phase 1", year: "2010", requires: "Iron Man", streamingOn: "HOTSTAR", runtime: 124, postCredits: 1, cast: ['stark', 'romanoff', 'fury', 'rhodey'] },
  { id: "thor", title: "Thor", phase: "Phase 1", year: "2011", requires: "Iron Man 2", streamingOn: "HOTSTAR", runtime: 115, postCredits: 1, cast: ['thor', 'fury', 'barton'] },
  { id: "cap1", title: "Captain America: The First Avenger", phase: "Phase 1", year: "2011", streamingOn: "HOTSTAR", runtime: 124, postCredits: 1, cast: ['rogers', 'fury'] },
  { id: "avengers1", title: "The Avengers", phase: "Phase 1", year: "2012", requires: "Thor, Captain America", streamingOn: "HOTSTAR", runtime: 143, postCredits: 2, cast: ['stark', 'rogers', 'thor', 'banner', 'romanoff', 'barton', 'fury'] },
  { id: "im3", title: "Iron Man 3", phase: "Phase 2", year: "2013", requires: "The Avengers", streamingOn: "HOTSTAR", runtime: 130, postCredits: 1, cast: ['stark', 'banner'] },
  { id: "thor2", title: "Thor: The Dark World", phase: "Phase 2", year: "2013", requires: "The Avengers", streamingOn: "HOTSTAR", runtime: 112, postCredits: 2, cast: ['thor'] },
  { id: "cap2", title: "Captain America: The Winter Soldier", phase: "Phase 2", year: "2014", requires: "The Avengers", streamingOn: "HOTSTAR", runtime: 136, postCredits: 2, cast: ['rogers', 'romanoff', 'wilson', 'fury'] },
  { id: "gotg1", title: "Guardians of the Galaxy", phase: "Phase 2", year: "2014", streamingOn: "HOTSTAR", runtime: 121, postCredits: 2, cast: ['quill'] },
  { id: "avengers2", title: "Avengers: Age of Ultron", phase: "Phase 2", year: "2015", requires: "The Winter Soldier", streamingOn: "HOTSTAR", runtime: 141, postCredits: 1, cast: ['stark', 'rogers', 'thor', 'banner', 'romanoff', 'barton', 'maximoff', 'vision', 'rhodey', 'wilson', 'fury'] },
  { id: "antman", title: "Ant-Man", phase: "Phase 2", year: "2015", requires: "Age of Ultron", streamingOn: "HOTSTAR", runtime: 117, postCredits: 2, cast: ['lang', 'wilson'] },
  { id: "cap3", title: "Captain America: Civil War", phase: "Phase 3", year: "2016", requires: "Age of Ultron, Ant-Man", streamingOn: "HOTSTAR", runtime: 147, postCredits: 2, cast: ['rogers', 'stark', 'romanoff', 'wilson', 'rhodey', 'barton', 'maximoff', 'vision', 'lang', 't_challa', 'parker'] },
  { id: "drstrange", title: "Doctor Strange", phase: "Phase 3", year: "2016", streamingOn: "HOTSTAR", runtime: 115, postCredits: 2, cast: ['strange', 'thor'] },
  { id: "gotg2", title: "Guardians of the Galaxy Vol. 2", phase: "Phase 3", year: "2017", requires: "Guardians of the Galaxy", streamingOn: "HOTSTAR", runtime: 136, postCredits: 5, cast: ['quill'] },
  { id: "spidey1", title: "Spider-Man: Homecoming", phase: "Phase 3", year: "2017", requires: "Civil War", streamingOn: "NETFLIX", runtime: 133, postCredits: 2, cast: ['parker', 'stark', 'rogers'] },
  { id: "thor3", title: "Thor: Ragnarok", phase: "Phase 3", year: "2017", requires: "Thor: The Dark World", streamingOn: "HOTSTAR", runtime: 130, postCredits: 2, cast: ['thor', 'banner', 'strange'] },
  { id: "bp", title: "Black Panther", phase: "Phase 3", year: "2018", requires: "Civil War", streamingOn: "HOTSTAR", runtime: 134, postCredits: 2, cast: ['t_challa'] },
  { id: "avengers3", title: "Avengers: Infinity War", phase: "Phase 3", year: "2018", requires: "Ragnarok, Black Panther", streamingOn: "HOTSTAR", runtime: 149, postCredits: 1, cast: ['stark', 'thor', 'banner', 'rogers', 'romanoff', 'strange', 'parker', 't_challa', 'maximoff', 'vision', 'wilson', 'rhodey', 'quill', 'fury'] },
  { id: "antman2", title: "Ant-Man and the Wasp", phase: "Phase 3", year: "2018", requires: "Civil War", streamingOn: "HOTSTAR", runtime: 118, postCredits: 2, cast: ['lang'] },
  { id: "cm", title: "Captain Marvel", phase: "Phase 3", year: "2019", streamingOn: "HOTSTAR", runtime: 123, postCredits: 2, cast: ['danvers', 'fury', 'rogers', 'romanoff', 'rhodey', 'banner'] },
  { id: "avengers4", title: "Avengers: Endgame", phase: "Phase 3", year: "2019", requires: "Infinity War, Captain Marvel", streamingOn: "HOTSTAR", runtime: 181, postCredits: 0, cast: ['stark', 'rogers', 'thor', 'banner', 'romanoff', 'barton', 'lang', 'rhodey', 'wilson', 'maximoff', 'strange', 'parker', 't_challa', 'danvers', 'quill', 'fury'] },
  { id: "spidey2", title: "Spider-Man: Far From Home", phase: "Phase 3", year: "2019", requires: "Endgame", streamingOn: "PRIME", runtime: 129, postCredits: 2, cast: ['parker', 'fury'] },
  { id: "bw", title: "Black Widow", phase: "Phase 4", year: "2021", requires: "Civil War", streamingOn: "HOTSTAR", runtime: 134, postCredits: 1, cast: ['romanoff'] },
  { id: "shangchi", title: "Shang-Chi", phase: "Phase 4", year: "2021", streamingOn: "HOTSTAR", runtime: 132, postCredits: 2, cast: ['shang_chi', 'banner', 'danvers'] },
  { id: "eternals", title: "Eternals", phase: "Phase 4", year: "2021", streamingOn: "HOTSTAR", runtime: 156, postCredits: 2, cast: ['eternals'] },
  { id: "spidey3", title: "Spider-Man: No Way Home", phase: "Phase 4", year: "2021", requires: "Far From Home", streamingOn: "NETFLIX", runtime: 148, postCredits: 2, cast: ['parker', 'strange'] },
  { id: "drstrange2", title: "Doctor Strange in the Multiverse of Madness", phase: "Phase 4", year: "2022", requires: "No Way Home", streamingOn: "HOTSTAR", runtime: 126, postCredits: 2, cast: ['strange', 'maximoff'] },
  { id: "thor4", title: "Thor: Love and Thunder", phase: "Phase 4", year: "2022", requires: "Endgame", streamingOn: "HOTSTAR", runtime: 119, postCredits: 2, cast: ['thor'] },
  { id: "bp2", title: "Black Panther: Wakanda Forever", phase: "Phase 4", year: "2022", requires: "Endgame", streamingOn: "HOTSTAR", runtime: 161, postCredits: 1, cast: ['shuri'] },
  { id: "antman3", title: "Ant-Man and the Wasp: Quantumania", phase: "Phase 5", year: "2023", requires: "Endgame", streamingOn: "HOTSTAR", runtime: 125, postCredits: 2, cast: ['lang'] },
  { id: "gotg3", title: "Guardians of the Galaxy Vol. 3", phase: "Phase 5", year: "2023", requires: "Endgame", streamingOn: "HOTSTAR", runtime: 150, postCredits: 2, cast: ['quill'] },
  { id: "marvels", title: "The Marvels", phase: "Phase 5", year: "2023", requires: "Captain Marvel", streamingOn: "HOTSTAR", runtime: 105, postCredits: 1, cast: ['danvers', 'khan', 'rambeau', 'fury'] },
  { id: "deadpool", title: "Deadpool & Wolverine", phase: "Phase 5", year: "2024", streamingOn: "HOTSTAR", runtime: 128, postCredits: 1, cast: ['deadpool', 'logan'] },
  { id: "f4", title: "The Fantastic Four: First Steps", phase: "Phase 6", year: "2025", streamingOn: "HOTSTAR", runtime: 130, postCredits: 1, cast: ['richards'] },
  { id: "thunderbolts", title: "Thunderbolts*", phase: "Phase 6", year: "2025", streamingOn: "HOTSTAR", runtime: 130, postCredits: 1, cast: ['yelena'] },
  { id: "avengers5", title: "Avengers: Doomsday", phase: "Phase 6", year: "2026", streamingOn: "HOTSTAR", runtime: 150, postCredits: 1, cast: ['stark'] },
  { id: "spidey4", title: "Spider-Man 4", phase: "Phase 6", year: "2026", streamingOn: "HOTSTAR", runtime: 130, postCredits: 1, cast: ['parker'] },
  { id: "avengers6", title: "Avengers: Secret Wars", phase: "Phase 6", year: "2027", streamingOn: "HOTSTAR", runtime: 180, postCredits: 1, cast: ['avengers'] }
];
