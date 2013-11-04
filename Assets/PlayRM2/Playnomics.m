#include <sys/socket.h>
#include <sys/sysctl.h>
#include <net/if.h>
#include <net/if_dl.h>


// Converts NSString to C style string by way of copy (Mono will free it)
#define MakeStringCopy( _x_ ) ( _x_ != NULL && [_x_ isKindOfClass:[NSString class]] ) ? strdup( [_x_ UTF8String] ) : NULL


NSString* macAddress()
{
    int mib[6];
    size_t len;
    char *buf;
    unsigned char *ptr;
    struct if_msghdr *ifm;
    struct sockaddr_dl *sdl;
    
    mib[0] = CTL_NET;
    mib[1] = AF_ROUTE;
    mib[2] = 0;
    mib[3] = AF_LINK;
    mib[4] = NET_RT_IFLIST;
    
    if( ( mib[5] = if_nametoindex( "en0" ) ) == 0 )
	{
        printf("Error: if_nametoindex error\n");
        return NULL;
    }
    
    if( sysctl( mib, 6, NULL, &len, NULL, 0 ) < 0 )
	{
        printf("Error: sysctl, take 1\n");
        return NULL;
    }
    
	buf = (char*)malloc( len );
    if( buf == NULL )
	{
        printf("Could not allocate memory. error!\n");
        return NULL;
    }
    
    if( sysctl( mib, 6, buf, &len, NULL, 0 ) < 0 )
	{
        printf("Error: sysctl, take 2");
        return NULL;
    }
    
    ifm = (struct if_msghdr*)buf;
    sdl = (struct sockaddr_dl*)( ifm + 1 );
    ptr = (unsigned char*)LLADDR( sdl );
    NSString *outstring = [NSString stringWithFormat:@"%02X:%02X:%02X:%02X:%02X:%02X", 
                           *ptr, *(ptr+1), *(ptr+2), *(ptr+3), *(ptr+4), *(ptr+5)];
    free( buf );
    
    return outstring;
}


const char * _playnomicsMacAddress()
{
	return MakeStringCopy( macAddress() );
}

