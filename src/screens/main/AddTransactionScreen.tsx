import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';

const accounts = ['Bank Account', 'Cash', 'Credit Card', 'Savings', 'Investment'];

const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Other Income'];
const expenseCategories = [
  'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
  'Bills & Utilities', 'Healthcare', 'Education', 'Other Expenses'
];

export const AddTransactionScreen: React.FC<{ navigation: any; route: any }> = ({ 
  navigation, 
  route 
}) => {
  const { user } = useAuth();
  const transactionType = route.params?.type || 'expense';
  
  const [formData, setFormData] = useState({
    amount: '',
    category: transactionType === 'income' ? incomeCategories[0] : expenseCategories[0],
    date: new Date().toISOString().split('T')[0],
    description: '',
    account: accounts[0],
    isRecurring: false,
  });
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCustomCategories();
  }, []);

  const fetchCustomCategories = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('categories')
        .select('name')
        .eq('user_id', user.id)
        .eq('type', transactionType)
        .eq('is_custom', true);

      if (data) {
        setCustomCategories(data.map(cat => cat.name));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload receipts.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setReceiptImage(result.assets[0].uri);
    }
  };

  const uploadReceiptImage = async (uri: string): Promise<string | null> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = `receipt_${Date.now()}.jpg`;
      const filePath = `receipts/${user?.id}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('receipts')
        .upload(filePath, blob);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('receipts')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!formData.amount || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (isNaN(parseFloat(formData.amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      let receiptUrl = null;
      if (receiptImage) {
        receiptUrl = await uploadReceiptImage(receiptImage);
      }

      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user?.id,
          amount: parseFloat(formData.amount),
          category: formData.category,
          type: transactionType,
          date: formData.date,
          description: formData.description,
          account: formData.account,
          is_recurring: formData.isRecurring,
          receipt_image: receiptUrl,
        });

      if (error) throw error;

      Alert.alert('Success', 'Transaction added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error adding transaction:', error);
      Alert.alert('Error', 'Failed to add transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = transactionType === 'income' 
    ? [...incomeCategories, ...customCategories]
    : [...expenseCategories, ...customCategories];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient 
        colors={transactionType === 'income' ? ['#4CAF50', '#45a049'] : ['#F44336', '#d32f2f']} 
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Add {transactionType === 'income' ? 'Income' : 'Expense'}
        </Text>
      </LinearGradient>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="cash" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={formData.amount}
              onChangeText={(text) => setFormData({ ...formData, amount: text })}
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.pickerContainer}>
            <Ionicons name="list" size={20} color="#666" style={styles.inputIcon} />
            <Picker
              selectedValue={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              style={styles.picker}
            >
              {categories.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="calendar" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Account *</Text>
          <View style={styles.pickerContainer}>
            <Ionicons name="card" size={20} color="#666" style={styles.inputIcon} />
            <Picker
              selectedValue={formData.account}
              onValueChange={(value) => setFormData({ ...formData, account: value })}
              style={styles.picker}
            >
              {accounts.map((account) => (
                <Picker.Item key={account} label={account} value={account} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="document-text" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add a note..."
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={3}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Recurring Transaction</Text>
          <Switch
            value={formData.isRecurring}
            onValueChange={(value) => setFormData({ ...formData, isRecurring: value })}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={formData.isRecurring ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Receipt (Optional)</Text>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Ionicons name="camera" size={24} color="#667eea" />
            <Text style={styles.imageButtonText}>
              {receiptImage ? 'Change Receipt' : 'Add Receipt'}
            </Text>
          </TouchableOpacity>
          {receiptImage && (
            <Image source={{ uri: receiptImage }} style={styles.receiptPreview} />
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: transactionType === 'income' ? '#4CAF50' : '#F44336' }
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Adding...' : `Add ${transactionType === 'income' ? 'Income' : 'Expense'}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    height: 50,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderStyle: 'dashed',
  },
  imageButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#667eea',
    fontWeight: '500',
  },
  receiptPreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 12,
  },
  submitButton: {
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});