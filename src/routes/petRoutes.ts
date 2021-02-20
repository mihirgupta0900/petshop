import { Router } from "express"
import { getRepository } from "typeorm"
import Pet from "../entity/pet"
import User from "../entity/user"

const router = Router()

router.get("/", (_, res) => {
  getRepository(Pet)
    .find()
    .then((pets) => {
      res.status(200).json(pets)
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in quering the DB" })
    })
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  getRepository(Pet)
    .findOne({ id: parseInt(id) })
    .then((pet) => {
      res.status(200).json(pet)
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in quering the DB" })
    })
})

router.post("/new", (req, res) => {
  const { name, age, breed } = req.body
  const repo = getRepository(Pet)
  const newPet = repo.create({
    name,
    age,
    breed,
  })
  repo
    .save(newPet)
    .then((pet) => {
      res.status(200).json(pet)
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in saving the pet" })
    })
})

router.delete("/:id", (req, res) => {
  getRepository(Pet)
    .delete({ id: parseInt(req.params.id) })
    .then((result) => {
      if (result.affected) {
        res.status(200).json({ message: "Successfully deleted" })
      } else {
        res.status(400).json({ message: "No pet deleted" })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in deleting the pet" })
    })
})

router.patch("/:id", async (req, res) => {
  const { name, user, age } = <PetUpdateBody>req.body
  const id = parseInt(req.params.id)
  const userRepo = getRepository(User)
  const petRepo = getRepository(Pet)
  let pet: Pet | undefined

  // Get a pet with the given id
  try {
    pet = await petRepo.findOne({ id })
  } catch (error) {
    res.status(400).json({ message: "Could not find a pet", error })
  }

  try {
    if (pet) {
      if (name) pet.name = name
      if (age) pet.age = age
      if (user) pet.owner = await userRepo.findOne({ id: user.id })
    }
    res.status(200).json({ message: "Pet updated", pet })
  } catch (error) {
    res.status(500).json({ message: "Could not update the pet", error })
  }
})

interface PetUpdateBody {
  name?: string
  age?: number
  user?: {
    id: number
  }
}

export default router
