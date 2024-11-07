const SortingControls = ({ currentSort, onSortChange }) => {
    const sortOptions = [
        { id: 'popular', icon: '🔥', label: 'Popular' },
        { id: 'hot', icon: '📈', label: 'Hot' },
        { id: 'new', icon: '🕒', label: 'New' }
    ];

    return (
        <div className="flex gap-2 mb-6">
            {sortOptions.map(({ id, icon, label }) => (
                <button
                    key={id}
                    onClick={() => onSortChange(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                        currentSort === id 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    {icon} <span>{label}</span>
                </button>
            ))}
        </div>
    );
};

export default SortingControls;