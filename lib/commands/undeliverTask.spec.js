jest.mock('../validation/rebounds')
jest.mock('../../model/tasks')
const undeliverTask = require('./undeliverTask')
const rebounds = require('../validation/rebounds')
const TaskTreeItem = require('../views/taskAndBlockerTreeItem')
const StoryInfoDataProvider = require('../views/storyInfoDataProvider')
const Context = require('../../test/factories/vscode/context')
const PtTask = require('../../model/tasks')

const context = Context.build()
const storyInfoProvider = new StoryInfoDataProvider(context)
const taskTreeItem = new TaskTreeItem('My task', storyInfoProvider)

describe('#undeliverTask', () => {
  afterEach(() => jest.clearAllMocks())

  it('should fail if taskTreeItem lacks an itemid', () => {
    undeliverTask(taskTreeItem, context)
    expect(rebounds).toBeCalledWith('failedundeliveredTask')
  })

  it('should refresh state view if update was successful', async () => {
    PtTask.mockImplementationOnce(() => ({
      updateTask: () => ({res: {statusCode: 200}})
    }))
    taskTreeItem.taskOrBlockerContext = 'complete-1'
    storyInfoProvider.refresh = jest.fn()
    await undeliverTask(taskTreeItem, context)
    expect(rebounds).toBeCalledWith('undeliveredTask', context)
    expect(storyInfoProvider.refresh).toHaveBeenCalledTimes(1)
  })

  it('should fail if undeliverTask statuscode is not 200', async () => {
    PtTask.mockImplementationOnce(() => ({
      updateTask: () => ({res: {statusCode: 201}})
    }))
    taskTreeItem.taskOrBlockerContext = 'complete-1'
    storyInfoProvider.refresh = jest.fn()
    await undeliverTask(taskTreeItem, context)
    expect(rebounds).toBeCalledWith('failedundeliveredTask')
  })
})
