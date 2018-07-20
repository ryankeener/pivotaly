const vscode = require("vscode")
const {createPTStatusBarItem} = require("../lib/pivotaly/createPTStatusBarItem")
const { commandRepo } = require("../lib/commands")

function activate(context) {
  let PTStatusBarItem = createPTStatusBarItem()

  let pendingStart = vscode.commands.registerCommand(commandRepo.commands.storyState.startStory, commandRepo.startStory)
  let pendingStop = vscode.commands.registerCommand(commandRepo.commands.storyState.stopStory, commandRepo.stopStory)
  let pendingFinish = vscode.commands.registerCommand(commandRepo.commands.storyState.finishStory, commandRepo.finishStory)
  let pendingDeliver = vscode.commands.registerCommand(commandRepo.commands.storyState.deliverStory, commandRepo.deliverStory)
  let pendingCreate = vscode.commands.registerCommand(commandRepo.commands.ptState.createStory, commandRepo.createStory)
  let pendingLink = vscode.commands.registerCommand(commandRepo.commands.workState.linkStory, commandRepo.linkStory)
  let pendingCommandPick = vscode.commands.registerCommand(commandRepo.commands.internal.showCommandsQuickPick, commandRepo.showAllCommands)

  // dispose
  context.subscriptions.push(PTStatusBarItem, pendingStart, pendingStop, pendingFinish, pendingDeliver, pendingCreate, pendingLink, pendingCommandPick);
}
exports.activate = activate;


function deactivate() {
  // clean up
}
exports.deactivate = deactivate;