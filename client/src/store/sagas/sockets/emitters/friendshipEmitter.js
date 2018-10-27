export function markFriendshipsAsSeen(socket, action) {
  socket.emit(action.type);
}
