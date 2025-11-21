import React from "react";
import { View, StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useNavigation, useNavigationState } from "@react-navigation/native";

export function SwipeableScreen({ children }) {
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state?.routes);
  const currentIndex = useNavigationState((state) => state?.index);

  const gesture = Gesture.Fling()
    .direction(Gesture.DIRECTION_LEFT | Gesture.DIRECTION_RIGHT)
    .onEnd((event) => {
      if (!routes || currentIndex === undefined) return;

      const availableRoutes = routes.map((r) => r.name);
      
      if (event.velocityX < 0 && currentIndex < availableRoutes.length - 1) {
        // Swipe left - go to next screen
        const nextRoute = availableRoutes[currentIndex + 1];
        // Only navigate if the route exists in the tab navigator
        // The tab navigator itself handles hiding protected routes
        navigation.navigate(nextRoute);
      } else if (event.velocityX > 0 && currentIndex > 0) {
        // Swipe right - go to previous screen
        const prevRoute = availableRoutes[currentIndex - 1];
        navigation.navigate(prevRoute);
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>{children}</View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
