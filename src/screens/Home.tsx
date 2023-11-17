import { useCallback, useEffect, useState } from 'react';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';
import { VStack, FlatList, HStack, Heading, Text, useToast } from 'native-base';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { ExerciseDTO } from '@dtos/ExercicesDTO';
import { Loading } from '@components/Loading';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState('costas');

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  async function fetchExercicesByGroup() {
    try {
      setIsLoading(true)
      api.get(`/exercises/bygroup/${groupSelected}`).then((response) => {
        setExercises(response.data);
      });
    } catch (e) {
      const isAppError = e instanceof AppError;
      const title = isAppError
        ? e.message
        : 'Não foi possivel carregar os exercícios.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    try {
      api.get('groups').then((response) => {
        setGroups(response.data);
      });
    } catch (e) {
      const isAppError = e instanceof AppError;
      const title = isAppError
        ? e.message
        : 'Não foi possivel carregar os grupos.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercicesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            onPress={() => setGroupSelected(item)}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      { isLoading ? <Loading /> : ( 
        <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} data={item} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
      )
      }
    </VStack>
  );
}
