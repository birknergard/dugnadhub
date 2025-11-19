import { IconButton, TextButton } from 'components/general/buttons';
import { colors, Column, Input, Label, PlainText, Row } from 'components/general/styledTags';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';

export default function TitleAndDescriptionSelection({
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  taskList,
  setTaskList
}: {
  title: string;
  onChangeTitle: (e: string) => void;
  description: string;
  onChangeDescription: (e: string) => void;
  taskList: string[],
  setTaskList: (task: string[]) => void
}) {

  const [task, setTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addTask = () => {
    if (task.length < 4) {
      setErrorMessage('Arbeidsoppgave må ha minst 4 bokstaver.');
      return;
    }

    setTaskList([...taskList, task]);
  }

  const removeTask = (taskIndex: number) => {
    const newList = [
      ...taskList.slice(0, taskIndex),
      ...taskList.slice(taskIndex + 1)
    ];
    setTaskList(newList);
  }

  useEffect(() => {
    if (errorMessage !== '') Toast.show({
      type: 'error',
      text1: errorMessage
    });
  }, [errorMessage])

  return (
    <>
      <Label>Gi din dugnad en passende tittel</Label>
      <Input
        onChangeText={(e) => onChangeTitle(e)}
        value={title}
        placeholder="Skriv din tittel ..."
      />

      <Label>Beskriv din dugnad</Label>
      <InputBox
        onChangeText={(e) => onChangeDescription(e)}
        value={description}
        multiline
        numberOfLines={6}
        placeholder="Beskriv dugnaden ..."
      />

      <Label>Legg inn arbeidsoppgaver</Label>
      <TaskColumn>
        <TaskInputRow>
          <TaskInput value={task} onChangeText={setTask} />
          <AddTaskButton
            color={colors.green}
            iconName=''
            iconPosition=''
            text='Ok'
            onTap={() => addTask()}
          />
        </TaskInputRow>
        <FlatList
          style={{ alignSelf: 'stretch', flexGrow: 1 }}
          contentContainerStyle={{ gap: 10 }}
          data={taskList}
          keyExtractor={(item, i) => item + i}
          renderItem={({ item, index }) => (
            <TaskContainer>
              <PlainText>{item}</PlainText>
              <IconButton
                iconName='xmark'
                onTap={() => removeTask(index)}
              />
            </TaskContainer>
          )}
        />
      </TaskColumn>
    </>
  );
}

const InputBox = styled(Input)({
  height: 100,
  textAlignVertical: 'top',
})

const TaskColumn = styled(Column)({
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10
})

const TaskInputRow = styled(Row)({
  flexGrow: 1,
  alignSelf: 'stretch',
  gap: 10,
  alignItems: 'center',
  justifyContent: 'space-between',
})

const TaskInput = styled(Input)({
  flexGrow: 1
})

const AddTaskButton = styled(TextButton)({
  alignSelf: 'auto',
})

const TaskContainer = styled(Row)({
  alignSelf: 'stretch',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderRadius: 15,
  borderColor: colors.white,
  backgroundColor: colors.green,
  padding: 5,
  paddingLeft: 10,
})

