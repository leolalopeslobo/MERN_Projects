const { z } = require("zod");

const taskSchema = z.object({
  title: z.string().optional(),

  content: z.string().optional(),

  priority: z.enum(["low", "moderate", "high"]).optional(),

  is_done: z.boolean().optional(),

  tags: z.array(z.string()).optional()
});

module.exports = {
  taskSchema
};