const Post = ({ post, onVote, userVotes, onDelete, onEdit, onHighlight }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(post.content);
    const score = post.upvotes - post.downvotes;
    const userVote = userVotes[post.id] || 0;
    const adminMode = isAdmin();

    const handleSaveEdit = () => {
        if (editContent.trim()) {
            onEdit(post.id, editContent);
            setIsEditing(false);
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm p-4 h-full transition-all hover:shadow-md
            ${post.highlighted ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
            {isEditing ? (
                <div className="h-full">
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full h-[calc(100%-40px)] p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="4"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-gray-800 text-base mb-3">{post.content}</p>
                    <div className="flex justify-between items-center text-sm">
                        <div className="text-gray-500 flex items-center gap-2">
                            {post.highlighted && (
                                <span className="text-blue-500 font-medium">★</span>
                            )}
                            <span>{new Date(post.timestamp).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                            {adminMode && (
                                <div className="flex gap-1 mr-2">
                                    <button
                                        onClick={() => onHighlight(post.id)}
                                        className={`transition-colors ${
                                            post.highlighted ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
                                        }`}
                                        title={post.highlighted ? 'Remove highlight' : 'Highlight as important'}
                                    >
                                        ★
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-gray-400 hover:text-gray-600"
                                        title="Edit post"
                                    >
                                        ✎
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Delete this post?')) {
                                                onDelete(post.id);
                                            }
                                        }}
                                        className="text-gray-400 hover:text-red-500"
                                        title="Delete post"
                                    >
                                        🗑
                                    </button>
                                </div>
                            )}
                            
                            <button 
                                onClick={() => onVote(post.id, 1)}
                                className={`flex items-center px-2 py-1 rounded-full transition-colors ${
                                    userVote === 1 
                                        ? 'bg-blue-100 text-blue-600' 
                                        : 'bg-gray-100 hover:bg-blue-50 text-gray-600'
                                }`}
                                disabled={userVote === 1}
                            >
                                👍
                            </button>
                            <span className={`font-medium ${
                                score > 0 ? 'text-blue-600' : 
                                score < 0 ? 'text-red-600' : 
                                'text-gray-600'
                            }`}>
                                {score}
                            </span>
                            <button 
                                onClick={() => onVote(post.id, -1)}
                                className={`flex items-center px-2 py-1 rounded-full transition-colors ${
                                    userVote === -1 
                                        ? 'bg-red-100 text-red-600' 
                                        : 'bg-gray-100 hover:bg-red-50 text-gray-600'
                                }`}
                                disabled={userVote === -1}
                            >
                                👎
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;