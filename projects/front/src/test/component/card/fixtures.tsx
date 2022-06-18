const TestComponent = () => (
    <div>
        test1
    </div>
);

const fixtures = {
    title: 'test card',
    children: [
        <TestComponent key={1} />,
    ]
}

export default fixtures;
