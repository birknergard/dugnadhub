import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from 'components/general/styledTags';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: { height: 60 }, // Adjust the height as needed
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: (props) => (
            <FontAwesome6
              name="people-group"
              size={props.size}
              style={{
                color: props.focused ? colors.black : colors.beige
              }} />
          ),
          tabBarLabelStyle: {
            fontFamily: 'sans-serif',
            fontSize: 17,
            fontWeight: 700,
          },
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.black,
          tabBarActiveBackgroundColor: colors.yellow,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: (props) => (
            <FontAwesome6
              name="add"
              size={props.size + 5}
              style={{
                color: props.focused ? colors.black : colors.beige
              }} />
          ),
          tabBarLabelStyle: {
            fontFamily: 'sans-serif',
            fontSize: 17,
            fontWeight: 700,
          },
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.black,
          tabBarActiveBackgroundColor: colors.yellow,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: (props) => (
            <FontAwesome6
              name="user-large"
              size={props.size + 5}
              style={{
                color: props.focused ? colors.black : colors.beige
              }} />
          ),
          tabBarLabelStyle: {
            fontFamily: 'sans-serif',
            fontSize: 17,
            fontWeight: 700,
          },
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.black,
          tabBarActiveBackgroundColor: colors.yellow,
          tabBarHideOnKeyboard: true,
        }}
      />
    </Tabs>
  );
}
