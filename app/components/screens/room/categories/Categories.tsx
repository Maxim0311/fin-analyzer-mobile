import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoom } from '../../../../providers/RoomProvider';
import CategoryItem from './CategoryItem';
import FilterList from '../../../ui/FilterList';
import { ICategory } from '../../../../api/interfaces/category';
import Field from '../../../ui/Field';
import { useCategoryService } from '../../../../api/service/CategoryService';
import Icon from '../../../ui/Icon';
import { useNavigation } from '@react-navigation/native';

const items = [
  { key: null, text: 'Все' },
  { key: true, text: 'Доходные' },
  { key: false, text: 'Расходные' },
];

const Categories = () => {
  const { roomId } = useRoom();

  const { categories, error, clearError, isLoading } = useCategoryService();

  const navigation = useNavigation();

  const [select, setSelect] = useState<boolean | null>(null);

  const [search, setSearch] = useState('');

  const filterItem = (item: ICategory) =>
    select !== null
      ? item.isExpenditure === select &&
        item.name.toLocaleLowerCase().includes(search.toLowerCase())
      : item.name.toLocaleLowerCase().includes(search.toLowerCase());

  const fetchCategories = () => useEffect(() => {}, [search]);

  useEffect(() => {
    console.log(categories);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Категории</Text>
        <Pressable
          style={styles.headerIcon}
          onPress={() => navigation.navigate('CategoryCreate')}
        >
          <Icon author="Ionicons" name="add" size={35} />
        </Pressable>
      </View>
      <Field
        placeholder="Поиск..."
        value={search}
        onChange={value => setSearch(value)}
        isSearch
      />

      <FilterList items={items} onPress={key => setSelect(key)} />
      <ScrollView>
        <View style={styles.categoryContainer}>
          {categories &&
            categories
              .filter(item => filterItem(item))
              .map(item => (
                <CategoryItem
                  key={item.id}
                  iconAuthor="Entypo"
                  iconName="drink"
                  text={item.name}
                  onPress={() => alert(item.description)}
                />
              ))}
          {isLoading && <ActivityIndicator />}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    padding: 10,
  },
  headerText: {
    fontSize: 25,
    textAlign: 'center',
  },
  headerWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  headerIcon: {
    position: 'absolute',
    right: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  categoryItem: {
    padding: 15,
  },
});

export default Categories;
