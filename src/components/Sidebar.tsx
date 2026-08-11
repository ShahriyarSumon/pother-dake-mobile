import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';

const Overlay = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.35);
  z-index: 40;
`;

const Drawer = styled.View`
  width: 260px;
  background-color: ${p => p.theme.colors.background};
  height: 100%;
  padding: 16px;
  elevation: 6;
`;

const Item = styled.TouchableOpacity`
  padding-vertical: 12px;
`;

const ItemText = styled.Text`
  font-size: 16px;
  color: ${p => p.theme.colors.primary};
`;

export default function Sidebar({ visible, onClose, navigation }: any) {
  if (!visible) return null;

  return (
    <Overlay activeOpacity={1} onPress={onClose}>
      <Drawer>
        <Item onPress={() => { onClose(); navigation.navigate('Landing'); }}>
          <ItemText>Home</ItemText>
        </Item>
        <Item onPress={() => { onClose(); navigation.navigate('Search'); }}>
          <ItemText>Search</ItemText>
        </Item>
        <Item onPress={() => { onClose(); navigation.navigate('Passenger'); }}>
          <ItemText>Passenger</ItemText>
        </Item>
        <Item onPress={() => { onClose(); navigation.navigate('Driver'); }}>
          <ItemText>Driver</ItemText>
        </Item>
        <Item onPress={() => { onClose(); navigation.navigate('Admin'); }}>
          <ItemText>Admin</ItemText>
        </Item>
        <Item onPress={() => { onClose(); navigation.navigate('Auth'); }}>
          <ItemText>Sign In</ItemText>
        </Item>
      </Drawer>
    </Overlay>
  );
}
