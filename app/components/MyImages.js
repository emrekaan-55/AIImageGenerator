// app/MyImages.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Grid, List, Share2, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import supabase from '../lib/supabaseClient';

export default function MyImages() {
    const router = useRouter();
    const [images, setImages] = useState([]);
    const [isGridView, setIsGridView] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setIsLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/');
                return;
            }

            const { data, error } = await supabase
                .from('images')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchImages();
        setRefreshing(false);
    };

    const handleDelete = async (imageId) => {
        Alert.alert(
            'Delete Image',
            'Are you sure you want to delete this image?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const { error } = await supabase
                                .from('images')
                                .delete()
                                .eq('id', imageId);

                            if (error) throw error;
                            setImages(prevImages => prevImages.filter(img => img.id !== imageId));
                            Alert.alert('Success', 'Image deleted successfully');
                        } catch (error) {
                            Alert.alert('Error', error.message);
                        }
                    }
                }
            ]
        );
    };

    const handleShare = async (imageUrl) => {
        try {
            // Share implementation
            console.log('Sharing:', imageUrl);
        } catch (error) {
            Alert.alert('Error', 'Failed to share image');
        }
    };

    const renderItem = ({ item, index }) => {
        if (isGridView) {
            return (
                <View style= { [s.gridItem, index % 2 === 0 ? { marginRight: 4 } : { marginLeft: 4 }]} >
                <Image 
            source={ { uri: item.url } }
            style = { s.gridImage }
            resizeMode = "cover"
                />
                <View style={ s.gridOverlay }>
                    <TouchableOpacity 
              style={ s.iconButton }
            onPress = {() => handleDelete(item.id)
}
            >
    <Trash2 color="#FFFFFF" size = { 20} />
        </TouchableOpacity>
        < TouchableOpacity
style = { s.iconButton }
onPress = {() => handleShare(item.url)}
            >
    <Share2 color="#FFFFFF" size = { 20} />
        </TouchableOpacity>
        </View>
        </View>
      );
    }

return (
    <View style= { s.listItem } >
    <Image 
          source={ { uri: item.url } }
style = { s.listImage }
resizeMode = "cover"
    />
    <View style={ s.listContent }>
        <Text style={ s.dateText }>
            { new Date(item.created_at).toLocaleDateString() }
            </Text>
            < View style = { s.listActions } >
                <TouchableOpacity 
              style={ s.iconButton }
onPress = {() => handleDelete(item.id)}
            >
    <Trash2 color="#FF4B4B" size = { 20} />
        </TouchableOpacity>
        < TouchableOpacity
style = { s.iconButton }
onPress = {() => handleShare(item.url)}
            >
    <Share2 color="#8B5CF6" size = { 20} />
        </TouchableOpacity>
        </View>
        </View>
        </View>
    );
  };

return (
    <SafeAreaView style= { s.container } >
    <View style={ s.header }>
        <TouchableOpacity 
          style={ s.backButton }
onPress = {() => router.back()}
        >
    <ArrowLeft color="#FFFFFF" size = { 24} />
        </TouchableOpacity>
        < Text style = { s.title } > My Images </Text>
            < TouchableOpacity
style = { s.viewToggle }
onPress = {() => setIsGridView(!isGridView)}
        >
    {
        isGridView?(
            <List color = "#FFFFFF" size = { 24} />
          ): (
                <Grid color = "#FFFFFF" size = { 24 } />
          )}
</TouchableOpacity>
    </View>

{
    images.length === 0 && !isLoading ? (
        <View style= { s.emptyState } >
        <Text style={ s.emptyText }> No images found </Text>
            < Text style = { s.emptySubText } >
                Generate some images and they will appear here
                    </Text>
                    </View>
      ) : (
        <FlatList
          data= { images }
    renderItem = { renderItem }
    keyExtractor = { item => String(item.id) }
    numColumns = { isGridView? 2: 1 }
    key = { isGridView? 'grid': 'list' }
    contentContainerStyle = { s.listContainer }
    refreshControl = {
            < RefreshControl
    refreshing = { refreshing }
    onRefresh = { handleRefresh }
    tintColor = "#8B5CF6"
        />
          }
        />
      )}
</SafeAreaView>
  );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    viewToggle: {
        padding: 8,
    },
    listContainer: {
        padding: 8,
    },
    gridItem: {
        flex: 1,
        margin: 4,
        borderRadius: 12,
        overflow: 'hidden',
        height: 200,
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    gridOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    listItem: {
        flexDirection: 'row',
        backgroundColor: '#262626',
        marginBottom: 8,
        borderRadius: 12,
        overflow: 'hidden',
    },
    listImage: {
        width: 100,
        height: 100,
    },
    listContent: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    dateText: {
        color: '#A3A3A3',
        fontSize: 14,
    },
    listActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 16,
    },
    iconButton: {
        padding: 8,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emptySubText: {
        color: '#A3A3A3',
        fontSize: 14,
        textAlign: 'center',
    },
});
