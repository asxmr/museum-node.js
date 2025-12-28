const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.photo.deleteMany();
  await prisma.album.deleteMany();

  const album1 = await prisma.album.create({
    data: { title: "Urban Portraits", description: "Mensen, stad, momenten" },
  });

  const album2 = await prisma.album.create({
    data: { title: "Silent Architecture", description: "Lijnen, gebouwen en licht" },
  });

  const album3 = await prisma.album.create({
    data: { title: "Nature Noir", description: "Natuur en contrast in zwart-wit" },
  });

  const base = "http://localhost:3000/static/photos";

  await prisma.photo.createMany({
    data: [
     { title: "Heart in Nature", url: `${base}/photo-03.jpeg`, cameraModel: "iPhone", albumId: album1.id },
      { title: "Seaside Rest", url: `${base}/photo-20.jpeg`, cameraModel: "iPhone", albumId: album1.id },
      { title: "Street Portrait", url: `${base}/photo-39.jpeg`, cameraModel: "iPhone", albumId: album1.id },

      { title: "Oxford Circus Night", url: `${base}/photo-22.jpeg`, cameraModel: "iPhone", albumId: album2.id },
      { title: "Stained Glass", url: `${base}/photo-49.jpeg`, cameraModel: "iPhone", albumId: album2.id },
      { title: "Rooftops & Tower", url: `${base}/photo-46.jpeg`, cameraModel: "iPhone", albumId: album2.id },

      { title: "Harry Potter & Cursed Child ", url: `${base}/photo-23.jpeg`, cameraModel: "iPhone", albumId: album3.id },
      { title: "Avenue Corner Hassn II", url: `${base}/photo-17.jpeg`, cameraModel: "iPhone", albumId: album3.id },
      { title: "Ferris Wheel Bay", url: `${base}/photo-38.jpeg`, cameraModel: "iPhone", albumId: album3.id },
    ],
  });

  console.log("Seed completed (met lokale foto's)");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
