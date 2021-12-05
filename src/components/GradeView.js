const backgroundColor = {
    'A': '#00d0a2',
    'AB': '#40d27a',
    'B': '#80d351',
    'BC': '#bfd259',
    'C': '#ffd600',
    'D': '#d4541e',
    'E': '#c62828',
}

const pickBackgroundColor = (gradePoint) => {
    if (gradePoint === 4)
        return backgroundColor.A
    else if (gradePoint >= 3.5)
        return backgroundColor.AB
    else if (gradePoint >= 3)
        return backgroundColor.B
    else if (gradePoint >= 2.5)
        return backgroundColor.BC
    else if (gradePoint >= 2)
        return backgroundColor.C
    else if (gradePoint >= 1)
        return backgroundColor.D
    else if (gradePoint < 1)
        return backgroundColor.E
    else
        return '#000'
}

export const GradeView = (props) => {
    const { gradePoint, onDelete, onEdit } = props;
    const backgroundColor = pickBackgroundColor(+(gradePoint));

    return (
        <div className='flex justify-center items-center border-4 border-gray-300 rounded-full w-28 h-28 mx-auto'
            style={{ backgroundColor }}>
            <h1 className='text-4xl font-poppins font-medium text-white'>{gradePoint}</h1>
        </div>
    );
}