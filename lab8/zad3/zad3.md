## Różnica między typami
### NodePort / ClusterIP
### Różnią się portami, które zostają wystawione 
```
spec.clusterIp:spec.ports[*].port
```
### dla ClusterIP
```
<NodeIP>:spec.ports[*].nodePort
spec.clusterIp:spec.ports[*].port
```
### dla NodePort