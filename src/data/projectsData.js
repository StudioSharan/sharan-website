import SiolimGoa from "../projects/SiolimGoa";

const projectsData = {
  moiraGoa: {
    title: "Moira Residence, Goa",
    location: "Moira, North Goa",
    year: "2024",
    description:
      "A tropical-modern residence designed on a lush Goan site with laterite textures, exposed concrete, and open courtyards.",

    gallery: [
      {
        src: `${process.env.PUBLIC_URL}/images/projects/moira-goa/1.jpg`,
        caption: "Entrance courtyard shaded by laterite walls and dense foliage.",
      },
      {
        src: `${process.env.PUBLIC_URL}/images/projects/moira-goa/2.jpg`,
        caption: "View of the living pavilion opening to the central water body.",
      },
      {
        src: `${process.env.PUBLIC_URL}/images/projects/moira-goa/3.jpg`,
        caption: "Exposed concrete frame contrasting with soft interior textures.",
      },
      {
        src: `${process.env.PUBLIC_URL}/images/projects/moira-goa/4.jpg`,
        caption: "Night view showing layered lighting and natural stone finishes.",
      },
    ],

    video: {
      type: "local", // "local" | "youtube" | "vimeo"
      src: `${process.env.PUBLIC_URL}/images/projects/moira-goa/moira-goa.mp4`,
      thumbnail: `${process.env.PUBLIC_URL}/images/projects/moira-goa/thumb.jpg`,
    },

    architects: ["Aditya Mehta", "Jahanzaib Bhat"],
  },

 SiolimGoa: {
    title: "Siolim Residence, Goa",
    location: "Moira, North Goa",
    year: "2024",
    description:
      "A tropical-modern residence designed on a lush Goan site with laterite textures, exposed concrete, and open courtyards.",

    gallery: [
      {
        src: `${process.env.PUBLIC_URL}/images/projects/siolim-goa/1.jpg`,
        caption: "Entrance courtyard shaded by laterite walls and dense foliage.",
      },
      {
        src: `${process.env.PUBLIC_URL}/images/projects/siolim-goa/2.jpg`,
        caption: "View of the living pavilion opening to the central water body.",
      },
      {
        src: `${process.env.PUBLIC_URL}/images/projects/siolim-goa/3.jpg`,
        caption: "Exposed concrete frame contrasting with soft interior textures.",
      },
      {
        src: `${process.env.PUBLIC_URL}/images/projects/siolim-goa/4.jpg`,
        caption: "Night view showing layered lighting and natural stone finishes.",
      },
    ],

    video: {
      type: "local", // "local" | "youtube" | "vimeo"
      src: `${process.env.PUBLIC_URL}/images/projects/siolim-goamoira-goa.mp4`,
      thumbnail: `${process.env.PUBLIC_URL}/images/projects/siolim-goa/thumb.jpg`,
    },

    architects: ["Aditya Mehta", "Jahanzaib Bhat"],
  },
};

export default projectsData;
