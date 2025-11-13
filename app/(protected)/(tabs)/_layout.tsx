import { FontAwesome6 } from '@expo/vector-icons';
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
          tabBarIcon: (props) => <FontAwesome6 name="people-group" size={props.size} />,
          tabBarLabelStyle: { fontSize: 14 },
          tabBarLabelPosition: 'below-icon'
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: (props) => <FontAwesome6 name="add" size={props.size} />,
          tabBarLabelStyle: { fontSize: 14 },
          tabBarLabelPosition: 'below-icon'
        }}
      />
      {/*
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: (props) => <FontAwesome6 name="user-large" size={props.size} />,
          tabBarLabelStyle: { fontSize: 14 },
          tabBarLabelPosition: 'below-icon'
        }}
      />
      */}
    </Tabs>
  );
}
