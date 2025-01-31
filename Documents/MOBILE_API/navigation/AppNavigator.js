import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import OrdersScreen from '../screens/OrdersScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
/*import PromotionsScreen from '../screens/PromotionsScreen';
import AccountScreen from '../screens/AccountScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import ReferralsScreen from '../screens/ReferralsScreen';*/

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function NotificationIcon() {
  const navigation = useNavigation();
  const [hasNotifications, setHasNotifications] = React.useState(true);
  return (
    <View>
      <IconButton
        icon="bell"
        size={24}
        onPress={() => navigation.navigate('Notificaciones')}
      />
      {hasNotifications && (
        <Badge
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: 'red',
          }}
        >
          ●
        </Badge>
      )}
    </View>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => <NotificationIcon navigation={navigation} />,
        })}
      />
      <Tab.Screen name="Catálogo" component={CatalogScreen} />
      <Tab.Screen name="Pedidos" component={OrdersScreen} />
      {/*<Tab.Screen name="Promociones" component={PromotionsScreen} />
      <Tab.Screen name="Cuenta" component={AccountScreen} />
      <Tab.Screen name="Pagos" component={PaymentsScreen} />
      <Tab.Screen name="Referidos" component={ReferralsScreen} />*/}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Notificaciones" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
