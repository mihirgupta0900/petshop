import { Router } from "express"

const router = Router()
import { getRepository } from "typeorm"
import Pet from "../entity/pet"
import User from "../entity/user"

router.get("/", (_, res) => {
  getRepository(User)
    .find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in quering the DB" })
    })
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  getRepository(User)
    .findOne({ id: parseInt(id) })
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in quering the DB" })
    })
})

router.post("/new", (req, res) => {
  const { name } = req.body
  const repo = getRepository(User)
  const newUser = repo.create({
    name,
  })
  repo
    .save(newUser)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in saving the user" })
    })
})

router.delete("/:id", (req, res) => {
  getRepository(User)
    .delete({ id: parseInt(req.params.id) })
    .then((result) => {
      if (result.affected) {
        res.status(200).json({ message: "Successfully deleted" })
      } else {
        res.status(400).json({ message: "No user deleted" })
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: "Error in deleting the user" })
    })
})

router.patch("/:id", async (req, res) => {
  const { name, pets } = <UserUpdateBody>req.body
  const id = parseInt(req.params.id)
  const userRepo = getRepository(User)
  const petRepo = getRepository(Pet)
  let user: User | undefined

  // Get a user with the given id
  try {
    user = await userRepo.findOne({ id })
  } catch (error) {
    res.status(400).json({ message: "Could not find a user", error })
  }

  try {
    if (user) {
      if (name) user.name = name
      if (pets && pets.length) {
        let petsList: Pet[] = []
        ;(
          await Promise.all(
            pets.map(async ({ id }) => await petRepo.findOne({ id }))
          )
        ).forEach((pet) => {
          if (pet === undefined) {
            return
          }
          petsList.push(pet)
        })
        user.pets = Promise.resolve(petsList)

        await userRepo.save(user)
      }
    }
    res.status(200).json({ message: "User updated", user })
  } catch (error) {
    res.status(500).json({ message: "Could not update the user", error })
  }
})

// Get all pets of a user
router.get("/:userId/pets", (req, res) => {
  getRepository(User)
    .findOne({ id: parseInt(req.params.id) })
    .then(async (user) => {
      if (user) {
        const pets = await user.pets
        res.status(200).json({ userName: user.name, pets })
      }
      res.status(500).json({ message: "Could not find a user" })
    })
    .catch((e) => {
      res.status(500).json({ message: "Error in quering the DB", error: e })
    })
})

interface UserUpdateBody {
  name?: string
  pets?: {
    id: number
  }[]
}

export default router
