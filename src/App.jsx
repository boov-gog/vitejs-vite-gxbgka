import { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const [panelOpen, setPanelOpen] = useState(false);

  const [testData] = useState([
    {
      id: '663ba042b53ea521b6f77c64',
      flowNames: [
        'B2BClearWhatsNewVip',
        'B2BClearWhatsNewVip',
        'B2B Simplified',
        'B2BClearWhatsNewBoxLevel',
        'B2BClearWhatsNewBoxLevel',
        'B2BClearWhatsNewVip',
        'B2BHCFlow',
        'B2BClearWhatsNewVip',
        'B2BClearWhatsNewBoxLevel',
        'B2B Simplified',
      ],
      application: 'B2B',
      name: 'B2BHC-Copy',
      tags: ['B2BHC-Copy'],
      healthCheck: true,
      deleted: false,
    },
  ]);

  const [columns, setColumns] = useState({
    column1: { id: 'column1', items: testData[0].flowNames }, // Populate column1 with flowNames
    column2: { id: 'column2', items: ['Sample_Step1', 'Sample_Step2'] },
    column3: {
      id: 'column3',
      items: ['Sample_Step3', 'Sample_Step4', 'Sample_Step5', 'Sample_Step6'],
    },
  });

  const tableData = [
    { step: 'Sample_Step1', stepNum: '1', data: 'Enter Text' },
    { step: 'Sample_Step2', stepNum: '2', data: 'Click Button' },
  ];

  const handleDragEnd = (result) => {
    console.log('columns', columns);
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const copiedItems = [...sourceColumn.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: copiedItems },
      });
    } else {
      const draggedItem = sourceColumn.items[source.index];

      if (destination.droppableId === 'column3') {
        const panelItem = sourceColumn.items[source.index];
        const newItem = {
          step: panelItem,
          stepNum: String(destColumn.items.length + 1),
          data: 'New Data',
        };

        const updatedSourceItems = sourceColumn.items.filter(
          (item, index) => index !== source.index
        );

        setColumns((prevColumns) => ({
          ...prevColumns,
          column3: {
            ...prevColumns.column3,
            items: [...prevColumns.column3.items, panelItem],
          },
          [source.droppableId]: { ...sourceColumn, items: updatedSourceItems },
          tableData: [...tableData, newItem],
        }));
      } else {
        const updatedDestinationItems = [...destColumn.items, draggedItem];

        setColumns((prevColumns) => ({
          ...prevColumns,
          column1: {
            ...prevColumns.column1,
            items: [...prevColumns.column1.items, draggedItem],
          },
          column2: {
            ...prevColumns.column2,
            items: [...prevColumns.column2.items, draggedItem],
          },
          column3: {
            ...prevColumns.column3,
            items: prevColumns.column3.items.filter(
              (item, index) => index !== source.index
            ),
          },
        }));
      }
    }
  };

  console.log('testData[0].flowNames', testData[0].flowNames);

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex' }}>
          <Droppable droppableId="column1">
            {(provided) => (
              <div
                className="drag"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h5>column 1 header</h5>
                {columns.column2.items.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p>{item}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="column2">
            {(provided) => (
              <div
                className="drag"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h5>column 2 header</h5>
                <table>
                  <thead>
                    <tr>
                      <th>Flow Steps</th>
                      <th>+T</th>
                      <th>
                        Flow Data <p>clone</p> <span> Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {columns.column2.items.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <tr
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <td>
                              <p>{item}</p>
                            </td>
                            <td>T({`${item.replace('Sample_Step', '')}`})</td>
                            <td>
                              Click button{' '}
                              <input
                                type="text"
                                id="fname"
                                name="fname"
                                value="text1"
                              />
                              <input
                                type="text"
                                id="fname"
                                name="fname"
                                value="text2"
                              />
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                  </tbody>
                </table>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="column3">
            {(provided) => (
              <div
                className="drag"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h5>
                  column 3 header{' '}
                  <span onClick={() => setPanelOpen(!panelOpen)}>
                    open panel
                  </span>
                </h5>
                {panelOpen && (
                  <div className="vertical-panel">
                    {columns.column3.items.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <p>{item}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
