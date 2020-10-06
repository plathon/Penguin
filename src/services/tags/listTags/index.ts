import database from '@config/database'
import TagRepository from '@repositories/tagRepository'
import ListTagsController from './listTagsController'
import ListTagsService from './listTagsService'

const tagRepository = new TagRepository(database)
const listTagsService = new ListTagsService(tagRepository)
const listTagsController = new ListTagsController(listTagsService)

export default listTagsController
