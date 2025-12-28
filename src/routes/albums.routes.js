const express = require("express");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const controller = require("../controllers/albums.controller");

const router = express.Router();

const albumBodySchema = z.object({
  body: z.object({
    title: z.string().min(3, "title moet minstens 3 karakters hebben"),
    description: z
      .string()
      .max(500, "description mag max 500 karakters hebben")
      .optional(),
  }),
  params: z.any(),
  query: z.any(),
});

router.get("/", controller.listAlbums);
router.get("/:id", controller.getAlbum);
router.post("/", validate(albumBodySchema), controller.createAlbum);
router.put("/:id", validate(albumBodySchema), controller.updateAlbum);
router.delete("/:id", controller.deleteAlbum);

module.exports = router;
