import { useState } from 'react';

const PostComposer = ({ onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onSubmit(content);
            setContent('');
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="bg-white rounded-3xl shadow-lg p-4 w-96">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-4 border border-gray-200 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="What's on your mind?"
                            rows="4"
                            autoFocus
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                                disabled={!content.trim()}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    title="Create new post"
                >
                    <span className="text-2xl">✍️</span>
                </button>
            )}
        </div>
    );
};

export default PostComposer;