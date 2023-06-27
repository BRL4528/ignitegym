import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base';
import { useForm, Controller } from 'react-hook-form';

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignUp() {
 const [name, setName] = useState()
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm();

  function handleReturnSingIn() {
    navigation.goBack()
  }

  function handleSignUp(data: any) {
   console.log(data)
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
        />
          )}
        />

        <Controller 
         control={control}
         name="pasword"
         render={({field: {onChange, value}}) => ( 
          <Input 
          value={value}
          onChangeText={onChange}
          placeholder="Senha"
          secureTextEntry
        />
          )}
        />
        
        <Controller 
         control={control}
         name="pasword_confirm"
         render={({field: {onChange, value}}) => ( 
          <Input 
          value={value}
          onChangeText={onChange}
          placeholder="Confirme a senha"
          secureTextEntry
          onSubmitEditing={handleSubmit(handleSignUp)}
          returnKeyType="send"
        />

          )}
        />

        <Button 
         title="Criar e acessar"
         onPress={handleSubmit(handleSignUp)}
        />
      </Center>
   
        <Button title="Voltar para o login" variant="outline"  mt={24} onPress={handleReturnSingIn}/>
   
    </VStack>
    </ScrollView>
  )
}