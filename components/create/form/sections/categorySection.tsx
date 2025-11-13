import { FontAwesome6 } from '@expo/vector-icons';
import { colors, Column, Heading, Label, PlainText, Row, RowPressable } from 'components/general/styledTags';
import { categoryConstants, Category } from 'constants/createConstants';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export default function CategorySelection({ category, onCategorySelect }: {
  category: string,
  onCategorySelect: (category: string) => void
}) {
  const [selected, setSelected] = useState<Category | null>(null)
  const [isShowingList, setShowingList] = useState(true);

  return (
    <BodyColumn>
      {isShowingList && (
        <ListColumn>
          <Label>Please select a category from the list below</Label>
          {
            categoryConstants.map((category, i) => (
              <ListItem
                key={i + 10}
                onPress={() => {
                  onCategorySelect(category.name)
                  setSelected(category)
                  setShowingList(false)
                }}
              >
                <Label>{category.name}</Label>
                <FontAwesome6
                  name={category.iconName}
                  size={20}
                />
              </ListItem>
            ))
          }
        </ListColumn>
      )}
      {selected &&
        <Pressable
          className={s.selectBox.container + ' ' + s.selectBox.selected}
          onPress={() => {
            setShowingList(true)
          }}
        >
          <Row>
            <Heading>{selected.name}</Heading>
            <FontAwesome6
              name={selected.iconName}
              size={20}
            />
          </Row>
          <PlainText>{selected.description}</PlainText>
        </Pressable>
      }
    </BodyColumn>
  );
}

const BodyColumn = styled(Column)({
  gap: 30
})

const ListColumn = styled(Column)({
  gap: 10,
})

const ListItem = styled(RowPressable)({
  alignSelf: 'stretch',
  gap: 5,
  borderWidth: 1,
  padding: 5,
  backgroundColor: colors.white
})

const s = {
  selectBox: {
    container: 'flex flex-col items-center border-dugnad-white rounded-xl bg-dugnad-white p-2 m-2',
    selected: 'border-2 bg-dugnad-yellow p-2'
  },
};
