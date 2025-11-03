const TechnologyCard = ({ id, title, description, status, onStatusChange }) => {
    const handleClick = () => {
        const statusOrder = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];
        
        onStatusChange(id, nextStatus);
    };

    const getStatusIcon = () => {
        switch(status) {
            case 'completed': return '✅';
            case 'in-progress': return '🔄';
            case 'not-started': return '⏳';
            default: return '📝';
        }
    };

    const getStatusText = () => {
        switch(status) {
            case 'completed': return 'Изучено';
            case 'in-progress': return 'В процессе';
            case 'not-started': return 'Не начато';
            default: return 'Не определено';
        }
    };

    return React.createElement('div', {
        className: `technology-card technology-card--${status}`,
        onClick: handleClick,
        style: { cursor: 'pointer' }
    },
        React.createElement('div', { className: 'technology-card__header' },
            React.createElement('h3', { className: 'technology-card__title' }, title),
            React.createElement('span', { className: 'technology-card__status-icon' }, getStatusIcon())
        ),
        React.createElement('p', { className: 'technology-card__description' }, description),
        React.createElement('div', { className: 'technology-card__footer' },
            React.createElement('span', { 
                className: `technology-card__status technology-card__status--${status}`
            }, getStatusText()),
            React.createElement('span', { className: 'technology-card__hint' }, 'Нажми для смены статуса')
        )
    );
};