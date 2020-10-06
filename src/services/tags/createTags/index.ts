import database from '@config/database'
import TagRepository from '@repositories/tagRepository'
import CreateTagsController from './createTagsController'
import CreateTagsService from './createTagsService'

const tagRepository = new TagRepository(database)
const createTagsService = new CreateTagsService(tagRepository)
const createTagsController = new CreateTagsController(createTagsService)

export default createTagsController
