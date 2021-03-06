import database, { Database } from '@config/database'
import Tag from '@entities/Tag'
import { CreateTagsRequestDTO } from '@services/tags/createTags/createTagsDTO'

export default class TagRepository {
  constructor(private database: Database) {}

  async createTag(createTagRequestDTO: CreateTagsRequestDTO): Promise<Tag> {
    const repository = (await database.getConnection()).getRepository(Tag)
    const { name } = createTagRequestDTO
    const tag = new Tag()
    tag.name = name
    const response = await repository.save(tag)
    return response
  }

  async listTags(limit: number, skip: number): Promise<Tag[]> {
    const repository = (await database.getConnection()).getRepository(Tag)
    const tags = await repository.find({ take: limit, skip: skip })
    return tags
  }
}
