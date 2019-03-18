jest.mock("../validation/validators/isStoryIDValid")
const { workspace } = require('vscode')
const { isStoryIDValid } = require("../validation/validators/isStoryIDValid")
const { getStoryID } = require('./stories')
const Context = require('../../test/factories/vscode/context')

const context = Context.build()

describe('#pivotaly getStoryId', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('get post story id successfully', async () => {
    isStoryIDValid.mockImplementation((ctx, id) => id === '54324')
    const result = await getStoryID(context, 'post-story-id-54324')
    expect(result).toEqual('54324')
  })
  it('get pre story id successfully', async () => {
    isStoryIDValid.mockImplementation((ctx, id) => id === '27343')
    const result = await getStoryID(context, '27343-pre-story-id')
    expect(result).toEqual('27343')
  })
  it.only('get story id with regexp delimiter successfully', async () => {
    jest.spyOn(workspace, 'getConfiguration').mockImplementationOnce(() => ({ ...workspace.getConfiguration(), get: () => '[\/-]' }))
    isStoryIDValid.mockImplementation((ctx, id) => id === '88623')
    const result = await getStoryID(context, 'feature/88623-pre-story-id')
    console.log(isStoryIDValid.mock.calls);
    expect(result).toEqual('88623')
  })
  it('Fail to get post or pre story id', async () => {
    isStoryIDValid.mockImplementation((ctx, id) => id === '54324')
    const result = await getStoryID(context, 'story')
    expect(typeof result).toEqual('undefined')
  })
})
