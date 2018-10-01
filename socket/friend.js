module.exports= function(io) {
	io.on('connection', (socket) =>{
		// console.log('A user is connected');
		socket.on('joinRequest', (myRequest, callback)=> {
			 // console.log(myRequest.sender);
			// socket.join(myRequest.sender);
			callback();
		});

		socket.on('friendRequest', (friend, callback)=> {
			io.to(friend.receiver).emit('newFriendRequest', {
				from: friend.sender,
				to: friend.receiver
			});
			callback();
		});
	});
}