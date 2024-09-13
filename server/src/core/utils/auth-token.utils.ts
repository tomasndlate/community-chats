import jwt from "jsonwebtoken";

export const generateAuthToken = (userId: string) => {
  try {
    if (!process.env.API_JWT_SECRET)
      throw new Error('API_JWT_SECRET environment variable is not defined');

      const token = jwt.sign({userId: userId}, process.env.API_JWT_SECRET, { expiresIn: '1h' });

      return token;

  } catch (error) {
      throw error;
    }
}

export const validateAuthToken = (token: string) => {
  try {
    if (!process.env.API_JWT_SECRET)
      throw new Error('API_JWT_SECRET environment variable is not defined');

    const tokenDecoded = jwt.verify(token, process.env.API_JWT_SECRET);

    return tokenDecoded;

  } catch (error) {
    throw error;
  }
};
