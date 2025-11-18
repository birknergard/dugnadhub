import { FontAwesome6 } from '@expo/vector-icons';
import { colors, Column, Heading, Label, PlainText, Row, RowPressable } from 'components/general/styledTags';
import { categories, Category } from 'models/dugnad';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export default function CategorySelection({ selected, onCategorySelect }: {
  selected: Category | null,
  onCategorySelect: (category: Category) => void
}) {
  return (
    <BodyColumn>
      <ListColumn>
        <Label>Please select a category from the list below</Label>
        {
          categories.map((category, i) => (
            <ListItem
              key={i + 10}
              $selected={selected === category}
              onPress={() => {
                onCategorySelect(category)
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
      {selected &&
        <View
          className={s.selectBox.container + ' ' + s.selectBox.selected}
        >
          <Row>
            <Heading>{`${selected.name}  `}</Heading>
            <FontAwesome6
              name={selected.iconName}
              size={20}
            />
          </Row>
          <PlainText>{selected.description}</PlainText>
        </View>
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

const ListItem = styled(RowPressable)<{ $selected: boolean }>(props => ({
  alignSelf: 'stretch',
  gap: 5,
  borderWidth: 1,
  padding: 5,
  backgroundColor: props.$selected ? colors.beige : colors.white,
  borderRadius: 10
}))

const s = {
  selectBox: {
    container: 'flex flex-col items-center rounded-xl p-4 m-2 rounded-3xl',
    selected: 'border-2 bg-dugnad-yellow p-2',
  }
};
