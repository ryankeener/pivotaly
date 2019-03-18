const { workspace } = require("vscode")
const { isStoryIDValid } = require("../validation/validators/isStoryIDValid")

const getStoryID = async (context, branch) => {
  const delimiter = new RegExp(workspace.getConfiguration().get('pivotaly.branchDelimiter'))
  const splitBranch = branch.split(delimiter)

  const validStoryIds = await Promise.all(splitBranch.map((element) => isStoryIDValid(context, element)));
  const storyIdIndex = validStoryIds.findIndex(valid => valid);

  if (storyIdIndex === -1) {
    return undefined;
  }

  return splitBranch[storyIdIndex];
}

module.exports = {
  getStoryID,
}
