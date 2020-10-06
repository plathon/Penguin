import Tag from '@entities/Tag'
import TagRepository from '@repositories/tagRepository'

export default class ListTagsService {
  constructor (private tagRepository: TagRepository) { }

  async execute (limit: number, skip: number): Promise<Tag[]> {
    return await this.tagRepository.listTags(limit, skip)
  }
}
