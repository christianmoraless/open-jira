interface SeedData {
  entries: SeedEntry[];
}
interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}
export const seedData: SeedData = {
  entries: [
    {
      description:
        "Pendientes: Proident adipisicing magna eiusmod et cupidatat.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "En progreso: Proident adipisicing magna eiusmod et cupidatat.",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description:
        "Completadas: Proident adipisicing magna eiusmod et cupidatat.",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
