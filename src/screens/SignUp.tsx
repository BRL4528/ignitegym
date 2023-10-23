import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup'


import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter ao menos 6 dígitos.'),
  password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'Senha incorreta.')
})

export function SignUp() {
 const [name, setName] = useState()
  const navigation = useNavigation();

  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
   resolver: yupResolver(signUpSchema)
  });

  function handleReturnSingIn() {
    navigation.goBack()
  }

  async function handleSignUp({ email, name, password }: FormDataProps) {
    try {
    await api.post('/users', {
      email,
      name,
      password
     } ).then((response) => {
      console.log(response)
     })
    } catch (e) {
     const isAppError = e instanceof AppError;
     const title = isAppError ? e.message : 'Não foi posssível criar a conta. Tente novamente mais tarde.'

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
          Crie sua conta
        </Heading>

        <Controller 
         control={control}
         name="name"
         render={({field: {onChange, value}}) => ( 
          <Input 
          value={value}
          placeholder="Nome" 
          onChangeText={onChange}
          errorMessage={errors.name?.message}
        />
          )}
        />

        <Controller 
         control={control}
         name="email"
         render={({field: {onChange, value}}) => ( 
          <Input 
          value={value}
          onChangeText={onChange}
          placeholder="E-mail" 
          keyboardType="email-address"
          autoCapitalize="none"
          errorMessage={errors.email?.message}
        />
          )}
        />

        <Controller 
         control={control}
         name="password"
         render={({field: {onChange, value}}) => ( 
          <Input 
          value={value}
          onChangeText={onChange}
          placeholder="Senha"
          secureTextEntry
          errorMessage={errors.password?.message}
        />
          )}
        />
        
        <Controller 
         control={control}
         name="password_confirm"
         render={({field: {onChange, value}}) => ( 
          <Input 
          value={value}
          onChangeText={onChange}
          placeholder="Confirme a senha"
          secureTextEntry
          onSubmitEditing={handleSubmit(handleSignUp)}
          returnKeyType="send"
          errorMessage={errors.password_confirm?.message}
        />

          )}
        />

        <Button 
         title="Criar e acessar"
         onPress={handleSubmit(handleSignUp)}
        />
      </Center>
   
        <Button title="Voltar para o login" variant="outline"  mt={16} onPress={handleReturnSingIn}/>
   
    </VStack>
    </ScrollView>
  )
}