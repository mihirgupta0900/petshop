const { PORT } = process.env

export const __port__ = (PORT && parseInt(PORT)) || 3000
