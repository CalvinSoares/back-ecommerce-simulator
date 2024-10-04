import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, name, password } = req.body;

  if (!email) {
    res.status(422).json({ message: "O email é obrigatório" });
    return;
  }

  if (!password) {
    res.status(422).json({ message: "A senha é obrigatória" });
    return;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(406).json({ message: "Usuário já cadastrado" });
    return;
  }

  const newUser = new User({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(422).json({ message: "O email é obrigatório" });
    return;
  }

  if (!password) {
    res.status(422).json({ message: "A senha é obrigatória" });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(422).json({ message: "Senha inválida" });
    return;
  }

  try {
    const secret = process.env.SECRET;

    if (!secret) {
      res.status(500).json({ message: "Erro de configuração do servidor" });
      return;
    }

    const token = jwt.sign({ id: user._id }, secret);
    res.status(200).json({ token, _id: user._id });
    return;
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
