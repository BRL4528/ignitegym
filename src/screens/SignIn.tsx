import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from 'native-base';

import { AuthNavigatorRouterProps} from '@routes/auth.routes';

import { useAuth } from '@hooks/useAuth';

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const { signIn } = useAuth();
  const toast = useToast();

  const navigation = useNavigation<AuthNavigatorRouterProps>();

  const { control, handleSubmit, formState: {errors} } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({email, password}: FormData) {
    try {
      await  signIn(email, password)

    } catch(error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível acessar, tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
    <VStack flex={1} px={10} >
      <Image
       alt="Pessoas treinando"
       source={BackgroundImg}
       defaultSource={BackgroundImg}
       resizeMode="contain"
       position="absolute"
      />

      <Center my={24}>
      <LogoSvg />

      <Text color="gray.100" fontSize="sm" >
        Treine sua mente e o seu corpo
      </Text>
      </Center>
      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading" >
          Acesse sua conta
        </Heading>

        <Controller 
         control={control}
         name="email"
         rules={{ required: "Informe o e-mail!"}}
         render={({field: { onChange }}) => (
            <Input 
            placeholder="E-mail" 
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            errorMessage={errors.email?.message}
          />
         )}
        />

        <Controller 
         control={control}
         name="password"
         rules={{ required: "Informe a senha!"}}
         render={({field: { onChange }}) => (
            <Input 
            placeholder="Senha"
            secureTextEntry
            onChangeText={onChange}
            errorMessage={errors.password?.message}
          />
         )}
        />

        <Button title="Acessar" onPress={handleSubmit(handleSignIn)}/>
      </Center>
      <Center mt={24} >
      <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body" >
        Ainda não tem acesso?
      </Text>
        <Button title="Criar conta" variant="outline" onPress={handleNewAccount}/>
      </Center>
    </VStack>
    </ScrollView>
  )
}