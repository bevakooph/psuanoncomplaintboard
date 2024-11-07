import { useState, useEffect } from 'react';
import Post from './components/Post';
import PostComposer from './components/PostComposer';
import SortingControls from './components/SortingControls';
import { sortPosts } from './utils/sortingUtils';
import { isAdmin, loginAdmin, clearStoredToken } from './utils/adminUtils';

function App() {
    // All state definitions at the top
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('posts');
        return saved ? JSON.parse(saved) : [];
    });

    const [userVotes, setUserVotes] = useState(() => {
        const saved = localStorage.getItem('userVotes');
        return saved ? JSON.parse(saved) : {};
    });

    // Add missing sortBy state
    const [sortBy, setSortBy] = useState('popular'); // Set default to 'popular'

    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [adminCreds, setAdminCreds] = useState({ username: '', password: '' });

    // LocalStorage effects
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem('userVotes', JSON.stringify(userVotes));
    }, [userVotes]);

    // Initial post if empty
    useEffect(() => {
        if (posts.length === 0) {
            setPosts([{
                id: 1,
                content: "This is a test post. Try upvoting or downvoting!",
                timestamp: Date.now(),
                upvotes: 0,
                downvotes: 0,
                highlighted: false
            }]);
        }
    }, []);

    // Handlers
    const handleVote = (postId, value) => {
        const currentVote = userVotes[postId] || 0;
        if (currentVote !== value) {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        upvotes: value === 1 ? post.upvotes + (currentVote === -1 ? 1 : 1) :
                            value === -1 ? post.upvotes - (currentVote === 1 ? 1 : 0) : post.upvotes,
                        downvotes: value === -1 ? post.downvotes + (currentVote === 1 ? 1 : 1) :
                            value === 1 ? post.downvotes - (currentVote === -1 ? 1 : 0) : post.downvotes
                    };
                }
                return post;
            }));
            setUserVotes({ ...userVotes, [postId]: value });
        }
    };

    const handleNewPost = (content) => {
        const newPost = {
            id: Date.now(),
            content,
            timestamp: Date.now(),
            upvotes: 0,
            downvotes: 0,
            highlighted: false
        };
        setPosts([newPost, ...posts]);
    };

    const handleDelete = (postId) => {
        if (isAdmin()) {
            setPosts(posts.filter(post => post.id !== postId));
        }
    };

    const handleEdit = (postId, newContent) => {
        if (isAdmin()) {
            setPosts(posts.map(post =>
                post.id === postId ? { ...post, content: newContent } : post
            ));
        }
    };

    const handleHighlight = (postId) => {
        if (isAdmin()) {
            setPosts(posts.map(post =>
                post.id === postId ? { ...post, highlighted: !post.highlighted } : post
            ));
        }
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (loginAdmin(adminCreds.username, adminCreds.password)) {
            setShowAdminLogin(false);
            setAdminCreds({ username: '', password: '' });
        } else {
            alert('Invalid credentials');
        }
    };

    // Get sorted posts
    const sortedPosts = sortPosts(posts, sortBy);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 pb-24">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Anonymous Bulletin Board
                    </h1>
                    {isAdmin() ? (
                        <button
                            onClick={() => {
                                clearStoredToken();
                                window.location.reload();
                            }}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Logout Admin
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowAdminLogin(true)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Admin
                        </button>
                    )}
                </div>

                {showAdminLogin && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <form onSubmit={handleAdminLogin} className="bg-white p-6 rounded-lg">
                            <input
                                type="text"
                                placeholder="Username"
                                value={adminCreds.username}
                                onChange={e => setAdminCreds({ ...adminCreds, username: e.target.value })}
                                className="block w-full mb-2 p-2 border rounded"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={adminCreds.password}
                                onChange={e => setAdminCreds({ ...adminCreds, password: e.target.value })}
                                className="block w-full mb-4 p-2 border rounded"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAdminLogin(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <SortingControls
                    currentSort={sortBy}
                    onSortChange={setSortBy}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
                    {sortedPosts.map(post => (
                        <Post
                            key={post.id}
                            post={post}
                            onVote={handleVote}
                            userVotes={userVotes}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onHighlight={handleHighlight}
                        />
                    ))}
                </div>

                <PostComposer onSubmit={handleNewPost} />
            </div>
        </div>
    );
}

export default App;