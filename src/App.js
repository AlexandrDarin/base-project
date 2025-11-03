const App = () => {
    const [technologies, setTechnologies] = React.useState([
        { 
            id: 1, 
            title: 'React Components', 
            description: 'Изучение функциональных и классовых компонентов, их жизненного цикла и методов', 
            status: 'not-started' 
        },
        { 
            id: 2, 
            title: 'JSX Syntax', 
            description: 'Освоение синтаксиса JSX, работа с выражениями и условным рендерингом', 
            status: 'not-started' 
        },
        { 
            id: 3, 
            title: 'State Management', 
            description: 'Работа с состоянием компонентов, использование useState и useEffect хуков', 
            status: 'not-started' 
        },
        { 
            id: 4, 
            title: 'Props and Data Flow', 
            description: 'Передача данных между компонентами через props, работа с дочерними компонентами', 
            status: 'not-started' 
        }
    ]);

    const handleStatusChange = (id, newStatus) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => 
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const completedCount = technologies.filter(tech => tech.status === 'completed').length;
    const totalCount = technologies.length;
    const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return React.createElement('div', { className: 'react-app' },
        React.createElement('div', { className: 'progress-header' },
            React.createElement('div', { className: 'progress-header__info' },
                React.createElement('h2', null, 'Трекер изучения технологий'),
                React.createElement('div', { className: 'progress-header__stats' },
                    React.createElement('span', null, 
                        'Изучено: ', React.createElement('strong', null, completedCount), 
                        ' из ', React.createElement('strong', null, totalCount)
                    ),
                    React.createElement('span', { className: 'progress-percentage' }, 
                        `${progressPercentage}%`
                    )
                )
            ),
            React.createElement('div', { className: 'progress-bar' },
                React.createElement('div', { 
                    className: 'progress-fill',
                    style: { width: `${progressPercentage}%` }
                })
            )
        ),
        
        React.createElement('div', { className: 'technologies-list' },
            technologies.map(technology => 
                React.createElement(TechnologyCard, {
                    key: technology.id,
                    id: technology.id,
                    title: technology.title,
                    description: technology.description,
                    status: technology.status,
                    onStatusChange: handleStatusChange
                })
            )
        )
    );
};