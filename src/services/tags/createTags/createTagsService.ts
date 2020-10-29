import TagRepository from '@repositories/tagRepository'
import { CreateTagsRequestDTO, CreateTagsResponseDTO } from './createTagsDTO'

export default class CreateTagsService {
  constructor(private tagRepository: TagRepository) {}

  async execute(
    createTagsRequestDTO: CreateTagsRequestDTO
  ): Promise<CreateTagsResponseDTO> {
    const tag = await this.tagRepository.createTag(createTagsRequestDTO)
    return tag
  }
}
