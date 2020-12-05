import keras
import numpy as np
import tensorflow as tf
from model.CycleGAN import CycleGan, get_resnet_generator, get_discriminator

if __name__ == "__main__":
    print("11111111\n")
    # Get the generators
    gen_G = get_resnet_generator(name="generator_G")
    gen_F = get_resnet_generator(name="generator_F")

    print("22222222222\n")
    # Get the discriminators
    disc_X = get_discriminator(name="discriminator_X")
    disc_Y = get_discriminator(name="discriminator_Y")

    print("333333333333\n")
    # Create cycle gan model
    cycle_gan_model = CycleGan(
        generator_G=gen_G, generator_F=gen_F, discriminator_X=disc_X, discriminator_Y=disc_Y, lambda_cycle=15
    )
    
    print("44444444444\n")
    # Load the checkpoints
    weight_file = "./pre-trained weights/cyclegan_checkpoints.100"
    cycle_gan_model.load_weights(weight_file).expect_partial()
    print("Weights loaded successfully")

    print("555555555\n")
    # inference
    image = tf.keras.preprocessing.image.load_img('./images/7.jpg')
    input_arr = keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to a batch.
    prediction = cycle_gan_model.gen_G(input_arr, training=False)[0].numpy()
    prediction = (prediction * 127.5 + 127.5).astype(np.uint8)
    img = (input_arr[0] * 127.5 + 127.5).astype(np.uint8)

    prediction = keras.preprocessing.image.array_to_img(prediction)
    prediction.save("./images/predicted_img_{i}.png".format(i=0))

    # Done
    print("Inference done!")